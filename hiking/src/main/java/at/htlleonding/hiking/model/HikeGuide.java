package at.htlleonding.hiking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "hike_guide")
public class HikeGuide extends PanacheEntity {
    public String name;
    @Column(name = "phone_number")
    public String phoneNumber;

    @OneToMany(mappedBy = "hikeGuide")
    @JsonIgnoreProperties("hikeGuide")
    public List<Hike> hikes;
}
