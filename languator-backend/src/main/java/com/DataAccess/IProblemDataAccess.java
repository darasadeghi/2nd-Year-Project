package com.DataAccess;

import java.util.ArrayList;

import com.Models.Database.Problem;


public interface IProblemDataAccess {
	public ArrayList<Problem> getProblems(int countProblems);
	public void setProblems(ArrayList<Problem> problems);
}
