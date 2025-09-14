import pygame
import random

class Food:
    def __init__(self):
        self.size = 15
        self.rect = pygame.Rect(0, 0, self.size, self.size)
        self.refresh()

    def refresh(self):
        random_x = random.randint(0, 580)
        random_y = random.randint(0, 580)
        self.rect.x = (random_x // 20) * 20
        self.rect.y = (random_y // 20) * 20

    def draw(self, screen):
        pygame.draw.ellipse(screen, (0, 0, 255), self.rect)