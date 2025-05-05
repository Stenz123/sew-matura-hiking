package at.htlleonding.hiking.boundary;

import at.htlleonding.hiking.dto.TourSummaryDto;
import at.htlleonding.hiking.model.Person;
import at.htlleonding.hiking.model.Tour;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/person")
public class PersonResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAll() {
        return Person.findAll().list();
    }
}
