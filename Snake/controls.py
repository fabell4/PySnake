import pygame

class Controls:
    def __init__(self, screen_width, screen_height):
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.touch_start_pos = None
        self.min_swipe_distance = 50

    def handle_keyboard_input(self, event, snake, game_over, game_objects):
        """Handle keyboard input events"""
        if not game_over:
            if event.key == pygame.K_UP:
                snake.up()
            elif event.key == pygame.K_DOWN:
                snake.down()
            elif event.key == pygame.K_LEFT:
                snake.left()
            elif event.key == pygame.K_RIGHT:
                snake.right()
        else:
            if event.key == pygame.K_SPACE:
                self._restart_game(game_objects)
                return False  # Return False to indicate game_over should be False
        return game_over

    def handle_touch_down(self, event, game_over):
        """Handle finger down events"""
        if not game_over:
            self.touch_start_pos = (event.x * self.screen_width, event.y * self.screen_height)

    def handle_touch_up(self, event, snake, game_over, game_objects):
        """Handle finger up events"""
        if not game_over and self.touch_start_pos:
            end_x = event.x * self.screen_width
            end_y = event.y * self.screen_height

            dx = end_x - self.touch_start_pos[0]
            dy = end_y - self.touch_start_pos[1]

            # Check if it's a swipe or tap
            if abs(dx) > self.min_swipe_distance or abs(dy) > self.min_swipe_distance:
                self._handle_swipe(dx, dy, snake)
            else:
                self._handle_tap(end_x, end_y, snake)
        elif game_over:
            self._restart_game(game_objects)
            game_over = False

        self.touch_start_pos = None
        return game_over

    def _handle_swipe(self, dx, dy, snake):
        """Process swipe gesture"""
        if abs(dx) > abs(dy):
            if dx > 0:
                snake.right()
            else:
                snake.left()
        else:
            if dy > 0:
                snake.down()
            else:
                snake.up()

    def _handle_tap(self, tap_x, tap_y, snake):
        """Process tap gesture - move toward tap location"""
        head_x = snake.head['x'] + snake.head['rect'].width // 2
        head_y = snake.head['y'] + snake.head['rect'].height // 2

        dx = tap_x - head_x
        dy = tap_y - head_y

        if abs(dx) > abs(dy):
            if dx > 0:
                snake.right()
            else:
                snake.left()
        else:
            if dy > 0:
                snake.down()
            else:
                snake.up()

    def _restart_game(self, game_objects):
        """Restart the game by resetting all objects"""
        scoreboard, snake, food = game_objects
        scoreboard.reset()
        snake.reset()
        food.refresh()
