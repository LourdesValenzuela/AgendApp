package com.agendapp.user_service.service;

import com.agendapp.user_service.dto.ClientRequestDTO;
import com.agendapp.user_service.dto.ClientResponseDTO;
import com.agendapp.user_service.entity.Client;
import com.agendapp.user_service.exception.ResourceNotFoundException;
import com.agendapp.user_service.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements IClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public List<ClientResponseDTO> findAll() {
        return clientRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public ClientResponseDTO findById(Long id) {
        Client client = findEntityById(id);
        return toResponseDTO(client);
    }

    @Override
    public ClientResponseDTO save(ClientRequestDTO dto) {
        Client client = new Client();

        client.setName(dto.getName());
        client.setEmail(dto.getEmail());

        return toResponseDTO(clientRepository.save(client));
    }

    @Override
    public ClientResponseDTO update(Long id, ClientRequestDTO dto) {
        Client client = findEntityById(id);

        client.setName(dto.getName());
        client.setEmail(dto.getEmail());

        return toResponseDTO(clientRepository.save(client));
    }

    @Override
    public void delete(Long id) {
        Client client = findEntityById(id);
        clientRepository.delete(client);
    }

    private Client findEntityById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Client not found with id: " + id
                        )
                );
    }

    private ClientResponseDTO toResponseDTO(Client client) {
        return new ClientResponseDTO(
                client.getId(),
                client.getName(),
                client.getEmail()
        );
    }
}