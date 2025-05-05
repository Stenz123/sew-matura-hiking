alter sequence PUBLIC.HIKE_GUIDE_SEQ
    restart with 50;

alter sequence PUBLIC.HIKE_REVIEW_SEQ
    restart with 50;

alter sequence PUBLIC.HIKE_SEQ
    restart with 50;

alter sequence PUBLIC.PERSON_SEQ
    restart with 50;

alter sequence PUBLIC.TOUR_SEQ
    restart with 50;

alter sequence PUBLIC.USER_SEQ
    restart with 50;


-- Daten für die "hike"-Tabelle
INSERT INTO hike (id, title, difficulty, length_in_km, region) VALUES
                                                                   (1, 'Mountain Adventure', 'HARD', 12.5, 'Alps'),
                                                                   (2, 'Forest Trail', 'EASY', 5.0, 'Black Forest'),
                                                                   (3, 'River Crossing', 'MEDIUM', 8.0, 'Amazon Rainforest');

-- Daten für die "person"-Tabelle
INSERT INTO person (id, name, email, registered_at) VALUES
                                                        (1, 'John Doe', 'john.doe@example.com', '2025-03-01'),
                                                        (2, 'Jane Smith', 'jane.smith@example.com', '2025-04-15'),
                                                        (3, 'Alice Johnson', 'alice.johnson@example.com', '2025-02-20'),
                                                        (4, 'Bob Brown', 'bob.brown@example.com', '2025-01-10');

-- Daten für die "hike_review"-Tabelle (mehrere Reviews pro Hike)
INSERT INTO hike_review (id, rating, comment, created_at, hike_id, person_id) VALUES
                                                                                  (1, 5, 'Amazing experience!', '2025-04-20 10:15:00', 1, 1),
                                                                                  (2, 4, 'Breathtaking views!', '2025-04-21 08:00:00', 1, 2),
                                                                                  (3, 3, 'Tiring but worth it', '2025-04-22 14:30:00', 1, 3),
                                                                                  (4, 4, 'Nice and peaceful', '2025-04-21 12:00:00', 2, 2),
                                                                                  (5, 5, 'Perfect for beginners', '2025-04-23 09:45:00', 2, 4),
                                                                                  (6, 2, 'Too many insects!', '2025-04-24 15:20:00', 3, 3),
                                                                                  (7, 3, 'Challenging terrain', '2025-04-25 17:00:00', 3, 1);

-- Daten für die "hike_guide"-Tabelle
INSERT INTO hike_guide (id, name, phone_number) VALUES
                                                    (1, 'Michael Schmidt', '+49 170 1234567'),
                                                    (2, 'Sarah Bauer', '+49 170 7654321');

-- Daten für die "tour"-Tabelle
INSERT INTO tour (id, name, start_date, end_date) VALUES
                                                      (1, 'Summer Adventure', '2025-06-01', '2025-06-15'),
                                                      (2, 'Autumn Exploration', '2025-09-10', '2025-09-20');

-- Daten für die "tour_hike"-Tabelle (viele-zu-viele-Beziehung)
INSERT INTO tour_hike (tour_id, hike_id) VALUES
                                             (1, 1),
                                             (1, 2),
                                             (2, 2),
                                             (2, 3);
