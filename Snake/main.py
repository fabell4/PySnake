import pygame
import time
from snake import Snake
from food import Food
from scoreboard import Scoreboard

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600
BACKGROUND_COLOR = (0, 0, 0)
FPS = 10

# Set up display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("My Snake Game")
clock = pygame.time.Clock()

# Create game objects
snake = Snake()
food = Food()
scoreboard = Scoreboard()

# Game loop
game_is_on = True
while game_is_on:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_is_on = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                snake.up()
            elif event.key == pygame.K_DOWN:
                snake.down()
            elif event.key == pygame.K_LEFT:
                snake.left()
            elif event.key == pygame.K_RIGHT:
                snake.right()

    # Move snake
    snake.move()

    # Check collision with food
    if snake.check_food_collision(food):
        food.refresh()
        snake.extend()
        scoreboard.increase_score()

    # Check wall collision
    if snake.check_wall_collision(SCREEN_WIDTH, SCREEN_HEIGHT):
        scoreboard.reset()
        snake.reset()

    # Check self collision
    if snake.check_self_collision():
        scoreboard.reset()
        snake.reset()

    # Draw everything
    screen.fill(BACKGROUND_COLOR)
    snake.draw(screen)
    food.draw(screen)
    scoreboard.draw(screen)

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
