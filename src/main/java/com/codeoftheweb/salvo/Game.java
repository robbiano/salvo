package com.codeoftheweb.salvo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")

    private long id;

    private LocalDateTime date;

    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    private Set<GamePlayer> gamePlayers;

    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    private Set<Score> score;

    public Game() {
    }

    public Game(LocalDateTime date) {

        this.date = date;
    }

    public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setGame(this);
        gamePlayers.add(gamePlayer);
    }

    public List<Player> getPlayers() {
        return gamePlayers.stream()
                .map(sub -> sub.getPlayer())
                .collect(toList());
    }

    public Map<String, Object> toDTO() {
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id",id);
        dto.put("created", date);
        dto.put("gamePlayers", gamePlayers.stream().map(GamePlayer::toDTO));
        return dto;
    }

    public long getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }


    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }
}