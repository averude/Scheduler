package com.averude.uksatse.scheduler.server.auth.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Slf4j
public class LoginRequestLogFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {
        var response    = (HttpServletResponse) servletResponse;

        var request     = new ContentCachingRequestWrapper((HttpServletRequest) servletRequest);
        var parameters  = request.getParameterMap();

        var ipAddress   = getIpAddress(request);
        var requestURI  = request.getRequestURI();
        var username    = getUsername(parameters);

        try {
            filterChain.doFilter(request, servletResponse);
        } finally {
            int status = response.getStatus();
            if (status >= 400) {
                log.warn("Authentication request from IP:'{}' URI:'{}' username:'{}' Response status:{}",
                        ipAddress, requestURI, username, status);
            } else {
                log.debug("Authentication request from IP:'{}' URI:'{}' username:'{}' Response status:{}",
                        ipAddress, requestURI, username, status);
            }

        }
    }

    private String getIpAddress(HttpServletRequest wrappedRequest) {
        String ipBehindTheProxy = wrappedRequest.getHeader("x-forwarded-for");
        if (ipBehindTheProxy != null && !ipBehindTheProxy.isBlank()) {
            return ipBehindTheProxy;
        }
        return wrappedRequest.getRemoteAddr();
    }

    private String getUsername(Map<String, String[]> parameters) {
        StringBuilder username = new StringBuilder();
        var usernameParamValues = parameters.get("username");

        if (usernameParamValues == null) {
            return "ANONYMOUS";
        }

        if (usernameParamValues.length > 0) {
            for (var value : usernameParamValues) {
                username.append(value);
            }
        }
        return username.toString();
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.debug("Filter '{}' configured for use", this.getClass().getSimpleName());
    }

    @Override
    public void destroy() {
    }
}
