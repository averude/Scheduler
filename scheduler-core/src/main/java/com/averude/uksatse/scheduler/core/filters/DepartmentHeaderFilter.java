package com.averude.uksatse.scheduler.core.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_BAD_REQUEST;

public class DepartmentHeaderFilter implements Filter {

    private static Logger logger = LoggerFactory.getLogger(DepartmentHeaderFilter.class);

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        if (!hasValidDepartmentHeader(request) && hasRestMethods(request)) {
            logger.warn(getWarnMessage(request));
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setContentType("application/json");
            response.sendError(SC_BAD_REQUEST, "Required header not specified in the request");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {

    }

    private boolean hasValidDepartmentHeader(HttpServletRequest request) {
        return request.getHeader("Department-ID") != null &&
                Long.parseLong(request.getHeader("Department-ID")) > 0;
    }

    private boolean hasRestMethods(HttpServletRequest request) {
        String method = request.getMethod();
        return method.equals("GET") ||
                method.equals("POST") ||
                method.equals("PUT") ||
                method.equals("DELETE");
    }

    private String getWarnMessage(HttpServletRequest request) {
        return new StringBuffer()
                .append("Host:")
                .append(request.getRemoteHost())
                .append(" with address:")
                .append(request.getRemoteAddr())
                .append(":")
                .append(request.getRemotePort())
                .append(" tried to send ")
                .append(request.getMethod())
                .append(" request to ")
                .append(request.getRequestURL())
                .append(" without \"Department-ID\" header.")
                .toString();
    }
}
