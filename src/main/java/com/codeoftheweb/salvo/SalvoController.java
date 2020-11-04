package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@RestController
@RequestMapping("/api")
public class SalvoController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GamePlayerRepository gamePlayerRepository;

    
    @RequestMapping("/games")
    public Set<Map<String, Object>> getGames() {
        return
                gameRepository.findAll().stream()
                        .map(Game::toDTO)
                        .collect(toSet());
    }

    @RequestMapping("/game_view/{gamePlayerId}")
    public Map<String, Object> getGamePlayers(@PathVariable Long gamePlayerId) {
        return gamePlayerRepository.findById(gamePlayerId.longValue()).get().gameViewDTO();
    }

}







