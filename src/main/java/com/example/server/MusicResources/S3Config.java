package com.example.server.MusicResources;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;



@Configuration
public class S3Config {
    @Value("${cloud.aws.credentials.accessKey}")
    private String AwsaccessKey;
    @Value("${cloud.aws.credentials.secretKey}")
    private String AwssecretKey;
    @Value("${cloud.aws.region.static}")
    private String region;

    @Bean
    public AwsCredentialsProvider awsCredentialsProvider() {
        AwsCredentials awsCredentials = AwsBasicCredentials.create(AwsaccessKey, AwssecretKey);
        return StaticCredentialsProvider.create(awsCredentials);
    }

    @Bean
    public S3Client s3Client() { // 액세스, 시크릿 키를 이용하여 자격증명 진행 aws sdk
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(awsCredentialsProvider())
                .build();
    }

    @Bean
    public S3Presigner s3Presigner() {
        return S3Presigner.builder()
                .region(Region.of(region))
                .credentialsProvider(awsCredentialsProvider())
                .build();
    }
}
