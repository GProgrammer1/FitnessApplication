package com.fitness.SecurityConfiguration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service

public class JWTService {

    private final static String JWT_SECRET = "feb70237ac3af499506ef60e0c7e9a2e0b5870791d5ca667a9c1b70794e60746";


    public Claims extractAllClaims(String token) {
        return Jwts
                .parser() //it's a parser because we want it to be able to parse the token and extract the claims
                .setSigningKey(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject() ;
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() * 1000 * 60 * 24 * 24))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        final String Username = extractUsername(token);
        return Username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
    public SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
    }
}
