package at.htlleonding.hiking.boundary;

import at.htlleonding.hiking.dto.PostReviewDto;
import at.htlleonding.hiking.model.Hike;
import at.htlleonding.hiking.model.HikeReview;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Comparator;
import java.util.List;

@Path("/api/reviews")
public class ReviewResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("hike/{id}")
    public List<HikeReview> getByHike(@PathParam("id") long id) {
        Hike hike = Hike.findById(id);
        if (hike == null) throw new NotFoundException("Hike not found");
        return hike.hikeReviews.stream().sorted(Comparator.comparing((HikeReview h) -> h.createdAt).reversed()).toList();
    }

    @POST
    @Path("hike/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response postReview(@PathParam("id") long id, PostReviewDto postReviewDto) {
        HikeReview hikeReview = postReviewDto.toReview(id);
        hikeReview.persist();
        return Response.status(Response.Status.CREATED).build();
    }
}
