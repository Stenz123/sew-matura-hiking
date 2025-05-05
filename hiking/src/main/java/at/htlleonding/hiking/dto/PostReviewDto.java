package at.htlleonding.hiking.dto;

import at.htlleonding.hiking.model.Hike;
import at.htlleonding.hiking.model.HikeReview;
import at.htlleonding.hiking.model.Person;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

import java.time.LocalDateTime;

public record PostReviewDto(
        long personId,
        String comment,
        int rating
) {
    public HikeReview toReview(long hikeId) {
        Person person = Person.findById(personId);
        if (person == null) throw new NotFoundException("Person not found");
        Hike hike = Hike.findById(hikeId);
        if (hike == null) throw new NotFoundException("Hike not found");

        if (rating < 0 || rating > 5) throw new BadRequestException("Rating must be between 1 and 5");

        HikeReview res = new HikeReview();
        res.rating = rating;
        res.comment = comment;
        res.hike = hike;
        res.person = person;
        res.createdAt = LocalDateTime.now();
        return res;
    }
}
