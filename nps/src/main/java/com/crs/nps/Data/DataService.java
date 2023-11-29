package com.crs.nps.Data;

import com.crs.nps.Form.FormResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class DataService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public DataService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void inserirDados() {
        FormResponse resposta = new FormResponse();
        resposta.setQuestion1("Resposta 1");
        resposta.setQuestion2("Resposta 2");
        resposta.setQuestion3("Resposta 3");

        mongoTemplate.save(resposta, "Crs");
    }
}