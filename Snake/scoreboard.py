import pygame

class Scoreboard:
    def __init__(self):
        self.score = 0
        self.high_score = self.read_high_score()
        pygame.font.init()
        self.font = pygame.font.Font(None, 24)

    def read_high_score(self):
        try:
            with open("data.txt") as data:
                return int(data.read())
        except FileNotFoundError:
            return 0

    def update_scoreboard(self):
        pass  # Drawing is handled in draw() method

    def increase_score(self):
        self.score += 1

    def reset(self):
        if self.score > self.high_score:
            self.high_score = self.score
            with open("data.txt", mode="w") as data:
                data.write(str(self.high_score))
        self.score = 0

    def draw(self, screen):
        score_text = self.font.render(f"Score: {self.score} High Score: {self.high_score}", 
                                    True, (255, 255, 255))
        screen.blit(score_text, (10, 10))