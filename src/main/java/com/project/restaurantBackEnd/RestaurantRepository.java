package com.project.restaurantBackEnd;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository <RestaurantEntity,Integer> {
	 Optional<RestaurantEntity> findByName(String name);
}
