package at.htlleonding.hiking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Tour extends PanacheEntity {
    public String name;
    @Column(name = "start_date")
    public LocalDate startDate;
    @Column(name = "end_date")
    public LocalDate endDate;

    @ManyToMany // (cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "tour_hike",
            joinColumns = @JoinColumn(name = "tour_id"),
            inverseJoinColumns = @JoinColumn(name = "hike_id"))
    @JsonIgnoreProperties({"tours","hikeReviews","hikeGuide" })
    public List<Hike> hikes;

}

