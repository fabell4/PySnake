import pygame
import sys
from snake import Snake
from food import Food
from scoreboard import Scoreboard
from controls import Controls

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 800
BACKGROUND_COLOR = (0, 0, 0)
FPS = 10

# Set up display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("My Snake Game")
clock = pygame.time.Clock()

# Font for game over message
font = pygame.font.Font(None, 48)
small_font = pygame.font.Font(None, 24)

# Create game objects
snake = Snake()
food = Food()
scoreboard = Scoreboard()
controls = Controls(SCREEN_WIDTH, SCREEN_HEIGHT)

# Game state
game_is_on = True
game_over = False

# Game loop
while game_is_on:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_is_on = False
        elif event.type == pygame.KEYDOWN:
            game_over = controls.handle_keyboard_input(event, snake, game_over, (scoreboard, snake, food))
        elif event.type == pygame.FINGERDOWN:
            controls.handle_touch_down(event, game_over)
        elif event.type == pygame.FINGERUP:
            game_over = controls.handle_touch_up(event, snake, game_over, (scoreboard, snake, food))

    if not game_over:
        # Move snake
        snake.move()

        # Check collision with food
        if snake.check_food_collision(food):
            food.refresh()
            snake.extend()
            scoreboard.increase_score()

        # Check wall collision
        if snake.check_wall_collision(SCREEN_WIDTH, SCREEN_HEIGHT):
            game_over = True

        # Check self-collision
        if snake.check_self_collision():
            game_over = True

    # Draw everything
    screen.fill(BACKGROUND_COLOR)
    snake.draw(screen)
    food.draw(screen)
    scoreboard.draw(screen)

    # Draw game over message
    if game_over:
        game_over_text = font.render("GAME OVER", True, (255, 0, 0))
        restart_text = small_font.render("Press SPACE to restart", True, (255, 255, 255))

        # Center the text
        game_over_rect = game_over_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        restart_rect = restart_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 50))

        screen.blit(game_over_text, game_over_rect)
        screen.blit(restart_text, restart_rect)

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
sys.exit()
