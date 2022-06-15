package com.Controllers;

import java.util.ArrayList;

import com.Models.Database.Problem;

public interface IProblemController {
	public ArrayList<Problem> getProblems(int countProblems);
}
