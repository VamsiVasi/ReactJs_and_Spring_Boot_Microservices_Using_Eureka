package com.stark.training_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EurekaTrainingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaTrainingServiceApplication.class, args);
	}

}
