package meetup;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class getmeetupinfo
 */
@WebServlet("/getmeetupinfo")
public class getmeetupinfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.setProperty("http.proxyHost","UR PROXY HOST");
		System.setProperty("http.proxyPort","PROXY PORT");
		
		String urlString = "http://api.meetup.com/"+request.getParameter("data")+"?key=YOURKEY&group_urlname=ny-tech&sign=true";
		URL url;
		
		try {
			url = new URL(urlString);
			URLConnection conn = url.openConnection();
			InputStream is = conn.getInputStream();
			BufferedReader bR = new BufferedReader(  new InputStreamReader(is));
			
			String line = "";

			StringBuilder responseStrBuilder = new StringBuilder();
			while((line = bR.readLine()) != null){

			    responseStrBuilder.append(line);
			}
			is.close();
			PrintWriter out=response.getWriter();
			out.write(responseStrBuilder.toString());
			System.out.println(responseStrBuilder.toString());
			

			
			
		} 
		catch (Exception e) {
			System.out.println(e);
		}
		finally{
			
		}
		
	}
	}


