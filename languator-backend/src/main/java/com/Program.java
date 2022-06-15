package com;


import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ApplicationSettings.ApplicationSettings;
import com.DataAccess.IProblemDataAccess;
import com.Factories.ProblemDataAccessFactory;
import com.Helpers.Helpers;
import com.Models.Database.Problem;


@SpringBootApplication
public class Program {

	public static void main(String[] args) {
		System.out.println("Starting up Languator's Backend.");
		ArrayList<Problem> problems = Helpers.queryApisForProblems(ApplicationSettings.countRecordsToQueryApisEachFetch);
		ProblemDataAccessFactory factory = ProblemDataAccessFactory.getInstance();
		IProblemDataAccess dataAccess = factory.createProblemDataAccess();
		dataAccess.setProblems(problems);
		Program.createBackgroundThreadToPopulateDatabase(ApplicationSettings.howFrequentToQueryApisInMinutes,ApplicationSettings.countRecordsToQueryApisEachFetch);
		SpringApplication.run(Program.class, args);
	}
	
	public static void createBackgroundThreadToPopulateDatabase(int howFrequentToPerformJobInMinutes, int countRecordsToPopulateDatabaseWith) {
		Thread backgroundThread = new Thread() {
		    @Override
		    public void run() {
		        while(true) {
		            try {
		            	Thread.sleep(1000*60*howFrequentToPerformJobInMinutes);
		            	ArrayList<Problem> problems = Helpers.queryApisForProblems(countRecordsToPopulateDatabaseWith);
		            	ProblemDataAccessFactory factory = ProblemDataAccessFactory.getInstance();
		        		IProblemDataAccess dataAccess = factory.createProblemDataAccess();
		        		dataAccess.setProblems(problems);
		        		System.out.println("Populated database with " + countRecordsToPopulateDatabaseWith + " records");
		            } catch (InterruptedException ie) {
		            }
		        }
		    }
		};
		// Start thread
		backgroundThread.start();
	}

}


