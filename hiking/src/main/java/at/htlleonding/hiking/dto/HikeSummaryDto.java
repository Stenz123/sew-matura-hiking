package at.htlleonding.hiking.dto;

import at.htlleonding.hiking.model.Difficulty;
import at.htlleonding.hiking.model.Hike;
import at.htlleonding.hiking.model.HikeReview;

import java.util.Comparator;
import java.util.List;

public record HikeSummaryDto (
        Long id,
        String title,
        Difficulty difficulty,
        double length,
        String region,
        Double averageRating,
        int bestRating,
        int numberOfReviews,
        List<HikeReview> hikeReviews
){
    public static HikeSummaryDto fromHike(Hike hike) {
        return new HikeSummaryDto(
                hike.id,
                hike.title,
                hike.difficulty,
                hike.lengthInKm,
                hike.region,
                hike.hikeReviews.stream().mapToDouble(review -> review.rating).average().orElse(0),
                (int) hike.hikeReviews.stream().mapToDouble(review -> review.rating).max().orElse(0),
                hike.hikeReviews.size(),
                hike.hikeReviews.stream().sorted(Comparator.comparing((HikeReview r)->r.createdAt).reversed()).toList()
        );
    }

}
