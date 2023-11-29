package com.crs.nps.Form;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormController {

    @Autowired
    private FormResponseRepository formResponseRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveForm(@RequestBody FormResponse formData) {
        try {
            // Adicione a impressão dos dados recebidos para verificar se estão corretos
            System.out.println("Dados recebidos: " + formData.toString());

            // Salve os dados no MongoDB
            FormResponse savedData = formResponseRepository.save(formData);

            // Adicione a impressão do ID gerado após a operação de salvamento
            System.out.println("ID gerado: " + savedData.getId());

            return ResponseEntity.ok("Dados do formulário salvos com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar dados do formulário.");
        }
    }
}
