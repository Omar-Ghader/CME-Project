package com.project.restaurantBackEnd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
@Autowired
RestaurantRepository restaurantRepository;
	
@GetMapping("/get-all-restaurants")
@CrossOrigin(origins = "http://localhost:3000")
public List<RestaurantEntity> getAllRestaurants(){
	List<RestaurantEntity> allRestaurantsList = restaurantRepository.findAll();
	return allRestaurantsList;
}
@GetMapping("/get-restaurant/{name}")
@CrossOrigin(origins = "http://localhost:3000")
public RestaurantEntity getRestaurantbyName(@PathVariable(value="name") String name) {
	RestaurantEntity restaurantEntity = restaurantRepository.findByName(name).get();
	return restaurantEntity;
}
@PostMapping("/create-restaurant")
public RestaurantEntity createRestaurant(@RequestBody RestaurantEntity restaurant) {
   
	RestaurantEntity savedRestaurant = restaurantRepository.save(restaurant);
	 
	 return savedRestaurant;
}
@PutMapping("/update-restaurant/{name}")
public ResponseEntity<RestaurantEntity> updateRestaurant(@PathVariable(value = "name") String name,
      @RequestBody RestaurantEntity restaurantDetails) {
	RestaurantEntity restaurant = restaurantRepository.findByName(name).get();
	restaurant.setName(restaurantDetails.getName());
	restaurant.setType(restaurantDetails.getType());
    final RestaurantEntity updatedRestaurant = restaurantRepository.save(restaurant);
    return ResponseEntity.ok(updatedRestaurant);
}

@DeleteMapping("/delete-restaurant/{name}")
public Map<String, Boolean> deleteRestaurant(@PathVariable(value = "name") String name)
{
 RestaurantEntity restaurant = restaurantRepository.findByName(name).get();

 	restaurantRepository.delete(restaurant);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
}



}
