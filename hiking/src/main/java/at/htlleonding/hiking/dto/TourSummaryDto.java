package at.htlleonding.hiking.dto;

import at.htlleonding.hiking.model.Hike;
import at.htlleonding.hiking.model.Tour;
import jakarta.persistence.Column;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.stream.Collectors;

public record TourSummaryDto(
        long id,
        String name,
        LocalDate startDate,
        LocalDate endDate,
        String hikes,
        double rating
) {
    public static TourSummaryDto fromTour(Tour tour) {
        return new TourSummaryDto(
                tour.id,
                tour.name,
                tour.startDate,
                tour.endDate,
                tour.hikes.stream().sorted(Comparator.comparingDouble(hike -> hike.lengthInKm)).map(hike -> hike.title).collect(Collectors.joining(", ")),
                tour.hikes.stream().flatMap(hike -> hike.hikeReviews.stream()).mapToDouble(review -> review.rating).average().orElse(0)
        );
    }
}
