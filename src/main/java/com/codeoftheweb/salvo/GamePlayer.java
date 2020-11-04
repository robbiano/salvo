package com.codeoftheweb.salvo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
public class GamePlayer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;

    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER,  cascade = CascadeType.ALL)
    private Set<Ship> ships = new HashSet<>();

    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER,  cascade = CascadeType.ALL)
    private Set<Salvo> salvoes = new HashSet<>();


    public GamePlayer() {
    }

    public GamePlayer(Player player, Game game, Set<Ship> ships, Set<Salvo> salvoes) {
        this.date = LocalDateTime.now();
        this.player = player;
        this.game = game;
        ships.forEach(ship -> {
            ship.setGamePlayer(this);
            this.ships.add(ship);
        });

        salvoes.forEach(salvo -> {
            salvo.setGamePlayer(this);
            this.salvoes.add(salvo);
        });
    }

    public Map<String, Object> toDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", id);
        dto.put("player", this.player.toDTO());
        dto.put("score",getScore() != null ? getScore().getScore() : null);

        return dto;
    }


    public Map<String, Object> gameViewDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", this.getGame().getId());
        dto.put("created", this.getGame().getDate());
        dto.put("gamePlayers", this.getGame().getGamePlayers().stream().map(GamePlayer::toDTO));
        dto.put("ships", this.getShips().stream().map(Ship::shipDTO));
        dto.put("salvoes", this.game.getGamePlayers().stream()
                .flatMap(gamePlayer -> gamePlayer.getSalvoes()
                        .stream().map(Salvo :: salvoDTO)));

        return dto;
    }

    public Score getScore(){
        return player.getScoreGame(game);
    }


    public long getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public Player getPlayer() {
        return player;
    }

    public Game getGame() {
        return game;
    }

    public Set<Ship> getShips() {
        return ships;
    }


    public void setPlayer(Player player) {
        this.player = player;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setShips(Set<Ship> ships) {
        this.ships = ships;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Set<Salvo> getSalvoes() {
        return salvoes;
    }

    public void setSalvoes(Set<Salvo> salvoes) {
        this.salvoes = salvoes;
    }
}