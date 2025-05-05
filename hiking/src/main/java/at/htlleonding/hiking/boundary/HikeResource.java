package at.htlleonding.hiking.boundary;

import at.htlleonding.hiking.dto.HikeSummaryDto;
import at.htlleonding.hiking.model.Hike;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.util.Comparator;
import java.util.List;

@Path("/api/hikes")
public class HikeResource {
    @GET
    public List<HikeSummaryDto> getHikes() {
        List<Hike> hikes = Hike.findAll().list();
        return hikes.stream().map(HikeSummaryDto::fromHike)
                .sorted(Comparator.comparing(HikeSummaryDto::averageRating).thenComparing(HikeSummaryDto::title))
                .toList();
    }

    @GET
    @Path("/{id}")
    public HikeSummaryDto getHikeById(@PathParam("id") long id) {
        Hike hike = Hike.findById(id);
        return HikeSummaryDto.fromHike(hike);
    }
}
