package com.Helpers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import com.ApplicationSettings.ApplicationSettings;
import com.Models.Database.Problem;
import com.Models.GoogleTranslateApi.GoogleTranslateApiResponse;
import com.Models.NewsApi.Article;
import com.Models.NewsApi.NewsApiResponse;
import com.google.gson.Gson;

public class Helpers {
	
	private static String sendGetRequestToUrl(String url) {
		try {
			URL urlToConnectTo = new URL(url);
	        URLConnection httpConnection = urlToConnectTo.openConnection(); // a new tcp connection is made per file sent in the http connection. so 1 http connection can have many tcp connections... i think this is how it works
	        BufferedReader inputStream = new BufferedReader(new InputStreamReader(httpConnection.getInputStream()));
	        StringBuilder response = new StringBuilder();
	        while(inputStream.ready()) {
	        	String line = inputStream.readLine();
	        	response.append(line);
	        }
	        return response.toString();
		}
		catch(Exception exception) {
			System.out.println("Something went wrong when sending GET request to: '" + url + "'");
			return null;
		}
	}
	
	// %20 == url char for space
	private static String replaceSpaceWithPercentage20(String string) {
		StringBuilder newString = new StringBuilder();
		for(int i = 0; i < string.length(); i++) {
			boolean isSpace = string.charAt(i) == ' ';
			if(isSpace) {
				newString.append("%20");
			}
			else {
				newString.append(string.charAt(i));
			}
		}
		return newString.toString();
	}
	
	private static String replaceHtmlEncodingForCharacterWithRegularCharacter(String string) {
		// all html encodings are 4-char length
		StringBuilder newString = new StringBuilder();
		for(int i = 0; i < string.length()-3; i++) {
			String currentFourLetterSubstring = string.substring(i, i+4);
			boolean isApostrophe = currentFourLetterSubstring.contentEquals("&#39");
			// also going to remove ';' chars, idk why google does this
			boolean isCurrentCharacterSemiColon = string.charAt(i) == ';';
			if(isApostrophe) {
				newString.append("'");
				i = i+3;
			}
			else if(isCurrentCharacterSemiColon) {

			}
			else {
				newString.append(string.charAt(i));
			}
		}
		for(int i = string.length() - 3; i < string.length(); i++) {
			boolean isCurrentCharacterSemiColon = string.charAt(i) == ';';
			if(!isCurrentCharacterSemiColon) {
				newString.append(string.charAt(i));
			}
		}
		return newString.toString();
	}
	
	// my idea is that translations for sentences that are only made up of letters and spaces
	// are easier to perform that sentences made up of any characters
	public static String shorternTitleToBeMoreTranslationFriendly(String string) {
		StringBuilder currentWord = new StringBuilder();
		StringBuilder currentSentence = new StringBuilder();
		String currentMaximumLengthFriendlySentence = new String();
		for(int i = 0; i < string.length(); i++) {
			char currentCharacter = string.charAt(i);
			boolean isUpperCaseLetter = currentCharacter >= 'A' && currentCharacter <= 'Z';
			boolean isLowerCaseLetter = currentCharacter >= 'a' && currentCharacter <= 'z';
			boolean isLetter = isUpperCaseLetter || isLowerCaseLetter;
			boolean isSpace = currentCharacter == ' ';
			if(isLetter) {
				currentWord.append(currentCharacter);
			}
			else if(isSpace) {
				currentSentence.append(currentWord);
				currentSentence.append(' ');
				currentWord = new StringBuilder();
			}
			else {
				 if(currentMaximumLengthFriendlySentence.length() < currentSentence.length()) {
					 currentMaximumLengthFriendlySentence = currentSentence.toString();
				 }
				 currentSentence = new StringBuilder();
				 currentWord = new StringBuilder();
				 // progress until you find a space, so you begin at a new word
				 int j = i+1;
				 for(; j < string.length(); j++) {
					 boolean isJAtSpace = string.charAt(j) == ' ';
					 i = j;
					 if(isJAtSpace) {
						 break;
					 }
				 }
			}
		}
		currentSentence.append(currentWord);
		 if(currentMaximumLengthFriendlySentence.length() < currentSentence.length()) {
			 currentMaximumLengthFriendlySentence = currentSentence.toString();
		 }
		 return currentMaximumLengthFriendlySentence;
	}
	

	public static ArrayList<Problem> queryApisForProblems(int countProblems){
		
		String newsApiUrl = ApplicationSettings.newsApiPath + "?country=us&apiKey=" + ApplicationSettings.newsApiKey;
		String jsonResponseFromNewsApiUrl = Helpers.sendGetRequestToUrl(newsApiUrl);
	    Gson jsonMapper = new Gson();
	    NewsApiResponse newsApiMappedResponse = jsonMapper.fromJson(jsonResponseFromNewsApiUrl, NewsApiResponse.class);
	    ArrayList<Problem> problems = new ArrayList<Problem>();    
	    
	    
        for(int i = 0; i < Math.min(newsApiMappedResponse.articles.size(), countProblems); i++) {
        	Article currentArticle = newsApiMappedResponse.articles.get(i);
        	String currentArticleTitle = currentArticle.title;
    		// don't include source of 'top headline' - format of each item is: "{headline} - {source}", and all we want is the {headline}
        	String sourcePrefix = " - ";
        	boolean isContainsSource = currentArticleTitle.contains(sourcePrefix);
        	if(isContainsSource) {
        		currentArticleTitle  = currentArticleTitle.split(sourcePrefix)[0];
        	}
        	currentArticleTitle = Helpers.shorternTitleToBeMoreTranslationFriendly(currentArticleTitle);
        	String urlFriendlyTitle = Helpers.replaceSpaceWithPercentage20(currentArticleTitle);
        	
        	// french translation
        	String frenchGoogleTranslateApiUrl = ApplicationSettings.googleTranslateApiPath + "?key=" + ApplicationSettings.googleTranslateApiKey + "&q=" + urlFriendlyTitle + "&target=fr";
        	String frenchJsonResponseFromGoogleTranslateApi = Helpers.sendGetRequestToUrl(frenchGoogleTranslateApiUrl);
        	GoogleTranslateApiResponse frenchGoogleTranslateApiMappedResponse = jsonMapper.fromJson(frenchJsonResponseFromGoogleTranslateApi, GoogleTranslateApiResponse.class);
        	
        	// spanish translation
        	String spanishGoogleTranslateApiUrl = ApplicationSettings.googleTranslateApiPath + "?key=" + ApplicationSettings.googleTranslateApiKey + "&q=" + urlFriendlyTitle + "&target=es";
        	String spanishJsonResponseFromGoogleTranslateApi = Helpers.sendGetRequestToUrl(spanishGoogleTranslateApiUrl);
        	GoogleTranslateApiResponse spanishGoogleTranslateApiMappedResponse = jsonMapper.fromJson(spanishJsonResponseFromGoogleTranslateApi, GoogleTranslateApiResponse.class);
        	
        	String frenchTranslation = Helpers.replaceHtmlEncodingForCharacterWithRegularCharacter(frenchGoogleTranslateApiMappedResponse.data.translations.get(0).translatedText);
        	String spanishTranslation = Helpers.replaceHtmlEncodingForCharacterWithRegularCharacter(spanishGoogleTranslateApiMappedResponse.data.translations.get(0).translatedText);
        	
        	// read into object
        	Problem problem = new Problem();
        	problem.setEnglish(currentArticleTitle);
        	problem.setSpanish(spanishTranslation);
        	problem.setFrench(frenchTranslation);
        	problems.add(problem);
        	printProblemDetails(problem);
        }
        
        return problems;
	        
	}
	
	public static void printProblemDetails(Problem problem) {
		System.out.println("English: " + problem.getEnglish() + ". French: " + problem.getFrench() + ". Spanish: " + problem.getSpanish());
	}
	
	public static void insertProblemQuery(Connection mysqlConnection, Problem problem) {
		try {
			String sqlQueryString = "INSERT INTO " + ApplicationSettings.problemsTableName + " (English,French,Spanish) VALUES (?,?,?)";		
			PreparedStatement preparedStatement = mysqlConnection.prepareStatement(sqlQueryString);
            preparedStatement.setString(1, problem.getEnglish());
            preparedStatement.setString(2, problem.getFrench());
            preparedStatement.setString(3, problem.getSpanish());
			preparedStatement.executeUpdate();;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
	

	
}
