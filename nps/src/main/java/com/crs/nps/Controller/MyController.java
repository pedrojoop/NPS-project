package com.crs.nps.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {
    @GetMapping("/index")
    public String showSurveyForm() {
        return "index";
    }
}
