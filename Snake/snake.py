import pygame

MOVE_DISTANCE = 20
UP = 90
DOWN = 270
LEFT = 180
RIGHT = 0

class Snake:
    def __init__(self):
        self.segments = []
        self.create_snake()
        self.head = self.segments[0]
        self.heading = RIGHT

    def create_snake(self):
        for position in [(0, 0), (-20, 0), (-40, 0)]:
            self.add_segment(position)

    def add_segment(self, position):
        segment = {
            'x': 300 + position[0],  # Center position
            'y': 300 + position[1],
            'rect': pygame.Rect(300 + position[0], 300 + position[1], 20, 20)
        }
        self.segments.append(segment)

    def extend(self):
        # Fix: Extract x,y coordinates from the last segment
        last_segment = self.segments[-1]
        last_position = (last_segment['x'] - 300, last_segment['y'] - 300)
        self.add_segment(last_position)

    def move(self):
        for seg_num in range(len(self.segments) - 1, 0, -1):
            new_x = self.segments[seg_num - 1]['x']
            new_y = self.segments[seg_num - 1]['y']
            self.segments[seg_num]['x'] = new_x
            self.segments[seg_num]['y'] = new_y
            self.segments[seg_num]['rect'].x = new_x
            self.segments[seg_num]['rect'].y = new_y

        if self.heading == UP:
            self.head['y'] -= MOVE_DISTANCE
        elif self.heading == DOWN:
            self.head['y'] += MOVE_DISTANCE
        elif self.heading == LEFT:
            self.head['x'] -= MOVE_DISTANCE
        elif self.heading == RIGHT:
            self.head['x'] += MOVE_DISTANCE

        self.head['rect'].x = self.head['x']
        self.head['rect'].y = self.head['y']

    def up(self):
        if self.heading != DOWN:
            self.heading = UP

    def down(self):
        if self.heading != UP:
            self.heading = DOWN

    def left(self):
        if self.heading != RIGHT:
            self.heading = LEFT

    def right(self):
        if self.heading != LEFT:
            self.heading = RIGHT

    def check_food_collision(self, food):
        return self.head['rect'].colliderect(food.rect)

    def check_wall_collision(self, screen_width, screen_height):
        return (self.head['x'] < 0 or self.head['x'] >= screen_width or
                self.head['y'] < 0 or self.head['y'] >= screen_height)

    def check_self_collision(self):
        for segment in self.segments[1:]:
            if self.head['rect'].colliderect(segment['rect']):
                return True
        return False

    def reset(self):
        self.segments.clear()
        self.create_snake()
        self.head = self.segments[0]
        self.heading = RIGHT

    def draw(self, screen):
        for segment in self.segments:
            pygame.draw.rect(screen, (255, 255, 255), segment['rect'])
