package com.crs.nps.Form;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormResponseRepository extends MongoRepository<FormResponse, String> {
}