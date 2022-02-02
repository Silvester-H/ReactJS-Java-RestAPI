package com.silvesterhasani.lufthansatestbackend;

import com.silvesterhasani.lufthansatestbackend.controller.UserController;
import com.silvesterhasani.lufthansatestbackend.model.User;
import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LufthansaTestBackendApplicationTests {

    @Autowired
    private UserController userController;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void getUsersTest() {
        Mockito.when(userRepository.findAll()).thenReturn(Stream.of(
                new User("Admin300","$2a$10$KDMMYUIhIzmjWZrmpUkFz.FlmzANUPcGCPa7QGqpxkvlSXqcN8L1a","Admin","2018-11-23 00:00:00","Admin001",new Date())).collect(
                Collectors.toList()));
        Assert.assertEquals(1, userController.getAllUsers("Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0YSIsImV4cCI6MTY0MzgyMjI4MywiaWF0IjoxNjQzODE1MDgzfQ.9s_OfbJX_aY6_xSiamgaBtKQput82GVzILsRwkQjg9g").size());
    }

}
