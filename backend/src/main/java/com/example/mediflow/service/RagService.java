package com.example.mediflow.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.core.io.ByteArrayResource;

import java.io.IOException;
import java.util.List;

@Service
public class RagService {

    private final VectorStore vectorStore;

    public RagService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void ingestDocument(MultipartFile file) throws IOException {
        ByteArrayResource resource = new ByteArrayResource(file.getBytes());
        TikaDocumentReader reader = new TikaDocumentReader(resource);
        List<Document> documents = reader.read();
        
        TokenTextSplitter splitter = new TokenTextSplitter();
        List<Document> splitDocuments = splitter.apply(documents);
        
        vectorStore.add(splitDocuments);
    }

    public List<Document> search(String query) {
        return vectorStore.similaritySearch(query);
    }
}
