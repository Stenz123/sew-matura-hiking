package at.htlleonding.hiking.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
public class Person extends PanacheEntity {
    public String name;
    public String email;
    @Column(name = "registered_at")
    public LocalDateTime registeredAt;
}
