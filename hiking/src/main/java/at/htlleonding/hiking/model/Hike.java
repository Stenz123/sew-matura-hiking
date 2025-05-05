package at.htlleonding.hiking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Hike extends PanacheEntity {
    public String title;
    @Enumerated(EnumType.STRING)
    public Difficulty difficulty;

    @Column(name = "length_in_km")
    public double lengthInKm;

    public String region;

    @ManyToOne
    @JsonIgnoreProperties("hikes")
    public HikeGuide hikeGuide;

    @OneToMany(mappedBy = "hike")
    @JsonIgnoreProperties("hike")
    public List<HikeReview> hikeReviews;

    @ManyToMany(mappedBy = "hikes")
    @JsonIgnoreProperties("hikes")
    private List<Tour> tours;
}
