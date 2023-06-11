package com.ssafy.be.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig extends AsyncConfigurerSupport {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //대기중 스레드
        executor.setCorePoolSize(1);
        //최대 스레드
        executor.setMaxPoolSize(1);
        //스레드 최대일때 대기 큐
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("CREATE-FONT-ASYNC-");
        executor.initialize();
        return executor;
    }
}
