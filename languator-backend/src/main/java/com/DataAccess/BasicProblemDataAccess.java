package com.DataAccess;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.ApplicationSettings.ApplicationSettings;
import com.Helpers.Helpers;
import com.Models.Database.Problem;

public class BasicProblemDataAccess implements IProblemDataAccess {
	
	private Connection mysqlConnection;
	
	public BasicProblemDataAccess() {
		try {
			// apparently i need to explicitly declare what class 'DriverManager' should use, right before using it
			Class.forName("com.mysql.cj.jdbc.Driver");
			this.mysqlConnection = DriverManager.getConnection(ApplicationSettings.databaseConnectionString, ApplicationSettings.databaseUsername, ApplicationSettings.databasePassword);
			Statement statement = this.mysqlConnection.createStatement();
			statement.executeUpdate(ApplicationSettings.mysqlStringToEnsureProblemsTableIsCreated);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	@Override
	public ArrayList<Problem> getProblems(int countProblems) {

		ArrayList<Problem> problemsToReturn = new ArrayList<Problem>();
		try {
			Statement statement = this.mysqlConnection.createStatement();
			String sqlQueryString = "SELECT * FROM " + ApplicationSettings.problemsTableName +" ORDER BY RAND() LIMIT " + countProblems;
			ResultSet mysqlResponse = statement.executeQuery(sqlQueryString);
			while(mysqlResponse.next()) {
				Problem problem = new Problem();
				problem.setEnglish(mysqlResponse.getString("English"));
				problem.setSpanish(mysqlResponse.getString("Spanish"));
				problem.setFrench(mysqlResponse.getString("French"));
				problemsToReturn.add(problem);
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		return problemsToReturn;
	}

	@Override
	public void setProblems(ArrayList<Problem> problems) {
		for(int i = 0; i < problems.size(); i++) {
			Helpers.insertProblemQuery(this.mysqlConnection, problems.get(i));			
		}
	}


}
