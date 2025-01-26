package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="student")
public class Student {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name="last_name")
    private String Last_Name;
    @Column(name="first_name")
    private String First_Name;
    @Column(name="email")
    private String email;

    public Student(){}

    public Student(String last_Name, String first_Name, String email) {
        Last_Name = last_Name;
        First_Name = first_Name;
        this.email = email;
    }

    public int getId() {
        return id;
    }
    public String getLast_Name() {
        return Last_Name;
    }

    public void setLast_Name(String last_Name) {
        Last_Name = last_Name;
    }

    public String getFirst_Name() {
        return First_Name;
    }

    public void setFirst_Name(String first_Name) {
        First_Name = first_Name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
