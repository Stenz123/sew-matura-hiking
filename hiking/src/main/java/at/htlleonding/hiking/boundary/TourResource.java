package at.htlleonding.hiking.boundary;

import at.htlleonding.hiking.dto.TourSummaryDto;
import at.htlleonding.hiking.model.Tour;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.annotations.Pos;

import java.util.List;

@Path("/api/tour")
public class TourResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<TourSummaryDto> getAllTours() {
        List<Tour> tours = Tour.findAll().list();
        return tours.stream().map(TourSummaryDto::fromTour).toList();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Tour getById(@PathParam("id") long id) {
        Tour tour = Tour.findById(id);
        if (tour == null)throw new NotFoundException("Tour not found");
        return tour;
    }
}
