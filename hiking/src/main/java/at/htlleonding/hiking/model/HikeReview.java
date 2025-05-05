package at.htlleonding.hiking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "hike_review")
public class HikeReview extends PanacheEntity {
    public int rating;
    public String comment;
    @Column(name = "created_at")
    public LocalDateTime createdAt;

    @ManyToOne
    @JsonIgnore
    @JsonIgnoreProperties("hikeReviews")
    public Hike hike;

    @ManyToOne
    @JsonIgnoreProperties("hikeReviews")
    public Person person;
}
