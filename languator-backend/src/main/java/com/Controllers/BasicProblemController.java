package com.Controllers;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DataAccess.IProblemDataAccess;
import com.Factories.ProblemDataAccessFactory;
import com.Models.Database.Problem;

@CrossOrigin(origins = "*")
@RestController
public class BasicProblemController implements IProblemController {
	
	private ProblemDataAccessFactory factory;
	
	
	public BasicProblemController() {
		this.factory = ProblemDataAccessFactory.getInstance();
	}


	// TODO: add in a threadpool - the controller is a singleton, can only serve 1 request at a time
	@Override
	@GetMapping("/")
	public ArrayList<Problem> getProblems(@RequestParam(value = "count_problems", defaultValue = "1") int countProblems) {
		IProblemDataAccess dataAccess = this.factory.createProblemDataAccess();
		ArrayList<Problem> problems = dataAccess.getProblems(countProblems);
		return problems;
	}
	
	// handle preflight requests
    @RequestMapping(
            value = "/**",
            method = RequestMethod.OPTIONS
    )
    public ResponseEntity handle() {
        return new ResponseEntity(HttpStatus.OK);
    }

}
