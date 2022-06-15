package com.Factories;

import com.DataAccess.BasicProblemDataAccess;
import com.DataAccess.IProblemDataAccess;

public class ProblemDataAccessFactory {
	private static ProblemDataAccessFactory factory;
	
	private ProblemDataAccessFactory() {
		
	}
	
	public static ProblemDataAccessFactory getInstance() {
		if(ProblemDataAccessFactory.factory == null) {
			ProblemDataAccessFactory.factory = new ProblemDataAccessFactory();
		}
		return ProblemDataAccessFactory.factory;
	}
	
	public IProblemDataAccess createProblemDataAccess() {
		IProblemDataAccess dataAccess = new BasicProblemDataAccess();
		return dataAccess;
	}
}
