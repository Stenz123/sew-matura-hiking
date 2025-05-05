package at.htlleonding.hiking.websocket;

import at.htlleonding.hiking.model.HikeReview;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.*;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.util.Set;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/ws/review")
@ApplicationScoped
public class ReviewWebsocket {
    // alternative: `Map` und `ConcurrentHashMap`
    private static final Set<Session> sessions = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        session.getUserProperties().put("clientId", UUID.randomUUID());
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

    public static void broadCast(HikeReview review) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            //We need to add support for LocalDateTime to Jackson to process it:
            objectMapper.registerModule(new JavaTimeModule());
            String message = objectMapper.writeValueAsString(review);
            for (Session session : sessions) {
                session.getAsyncRemote().sendText(message);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    // -- optional --
    @OnError
    public void onError(Session session, @PathParam("name") String name, Throwable throwable) {
        System.out.println("onError> " + name + ": " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("name") String name) {
        //Handle incoming messages if needed
    }
}