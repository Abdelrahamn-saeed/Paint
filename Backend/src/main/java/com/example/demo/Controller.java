package com.example.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.xml.parsers.DocumentBuilderFactory;
import org.xml.sax.InputSource;
import java.io.StringReader;
import java.nio.file.StandardOpenOption;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/files")
public class Controller {
    @Autowired
    private ObjectMapper objectMapper;

    // Base directory for file operations (configure this in application.properties)


    @PostMapping("/save")
    public ResponseEntity<?> saveStringToFile(@RequestBody Recievable content) {
        try {
            // Validate input
            if (content == null || content.filePath == null) {
                return ResponseEntity.badRequest().body("Invalid file path");
            }

            // Create directories if they don't exist
            File directory = new File(content.filePath).getParentFile();
            if (directory != null) {
                directory.mkdirs(); // This creates parent directories if they don't exist
            }

            // Construct full file path
            File jsonfile = new File(content.filePath);




            // Ensure we have write permissions
            if (!jsonfile.getParentFile().canWrite()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("No write permissions for the specified directory");
            }

            try (FileWriter writer = new FileWriter(jsonfile)) {
                writer.write(content.str != null ? content.str : "nothing");
                System.out.println("File written successfully: " + content.filePath);
            }


            return ResponseEntity.ok("File saved successfully");
        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error writing file: " + e.getMessage());
        }
    }

    // Validate filename to prevent security risks


    @PostMapping("/load")
    public ResponseEntity<String> retrieveFile(@RequestBody Filefounder f) {
        try {
            // Construct full file path
            Path fullPath = Paths.get(f.getFilePath());

            // Check if file exists
            if (!Files.exists(fullPath)) {
                return ResponseEntity.notFound().build();
            }

            // Read file content
            String fileContent = Files.readString(fullPath);

            // Determine file type based on file extension
            String fileName = fullPath.getFileName().toString().toLowerCase();

            if (fileName.endsWith(".json")) {
                // Validate JSON content
                try {
                    objectMapper.readTree(fileContent);
                } catch (IOException e) {
                    return ResponseEntity.badRequest()
                            .body("Invalid JSON content in file");
                }
            } else if (fileName.endsWith(".xml")) {
                // Basic XML validation (optional)
                try {
                    DocumentBuilderFactory.newInstance()
                            .newDocumentBuilder()
                            .parse(new InputSource(new StringReader(fileContent)));
                } catch (Exception e) {
                    return ResponseEntity.badRequest()
                            .body("Invalid XML content in file");
                }
            } else {
                return ResponseEntity.badRequest()
                        .body("Unsupported file type. Only JSON and XML are supported.");
            }

            return ResponseEntity.ok(fileContent);
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to read file: " + e.getMessage());
        }
    }
}
