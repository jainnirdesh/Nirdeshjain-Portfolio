from PIL import Image, ImageDraw, ImageFont
import os

# Create images directory
if not os.path.exists('images'):
    os.makedirs('images')

# Generate profile image
def create_profile_image():
    # Create a 400x400 image with gradient-like background
    img = Image.new('RGB', (400, 400), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Create gradient effect
    for y in range(400):
        color_ratio = y / 400
        r = int(102 * (1 - color_ratio) + 118 * color_ratio)
        g = int(126 * (1 - color_ratio) + 75 * color_ratio)
        b = int(234 * (1 - color_ratio) + 162 * color_ratio)
        draw.line([(0, y), (400, y)], fill=(r, g, b))
    
    # Add profile circle
    draw.ellipse([170, 130, 230, 190], fill='rgba(255, 255, 255, 0.3)', outline='white', width=3)
    
    # Add body shape
    draw.pieslice([160, 220, 240, 300], 0, 180, fill='rgba(255, 255, 255, 0.3)')
    
    # Add text (simplified)
    try:
        font = ImageFont.truetype("arial.ttf", 24)
        font_small = ImageFont.truetype("arial.ttf", 16)
    except:
        font = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    draw.text((200, 320), "NIRDESH JAIN", fill='white', font=font, anchor='mm')
    draw.text((200, 350), "Software Developer", fill='white', font=font_small, anchor='mm')
    
    img.save('profile-image.jpg', 'JPEG', quality=90)

# Generate project images
def create_project_images():
    projects = [
        {'name': 'E-commerce Website', 'colors': ['#FF6B6B', '#4ECDC4'], 'icon': '🛒'},
        {'name': 'Task Management App', 'colors': ['#A8E6CF', '#3498DB'], 'icon': '📋'},
        {'name': 'Weather App', 'colors': ['#87CEEB', '#4682B4'], 'icon': '🌤️'},
        {'name': 'Student Management', 'colors': ['#FFD93D', '#FF6B35'], 'icon': '🎓'},
        {'name': 'Portfolio Website', 'colors': ['#667eea', '#764ba2'], 'icon': '💼'},
        {'name': 'Calculator App', 'colors': ['#2C3E50', '#3498DB'], 'icon': '🔢'}
    ]
    
    for i, project in enumerate(projects, 1):
        img = Image.new('RGB', (400, 250), color=project['colors'][0])
        draw = ImageDraw.Draw(img)
        
        # Create gradient effect
        for y in range(250):
            color_ratio = y / 250
            # Convert hex to RGB
            color1 = tuple(int(project['colors'][0][i:i+2], 16) for i in (1, 3, 5))
            color2 = tuple(int(project['colors'][1][i:i+2], 16) for i in (1, 3, 5))
            
            r = int(color1[0] * (1 - color_ratio) + color2[0] * color_ratio)
            g = int(color1[1] * (1 - color_ratio) + color2[1] * color_ratio)
            b = int(color1[2] * (1 - color_ratio) + color2[2] * color_ratio)
            draw.line([(0, y), (400, y)], fill=(r, g, b))
        
        # Add decorative elements
        for j in range(20):
            import random
            x = random.randint(0, 400)
            y = random.randint(0, 250)
            radius = random.randint(1, 3)
            draw.ellipse([x-radius, y-radius, x+radius, y+radius], fill='rgba(255, 255, 255, 0.3)')
        
        # Add project title
        try:
            font = ImageFont.truetype("arial.ttf", 20)
            font_small = ImageFont.truetype("arial.ttf", 14)
        except:
            font = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        draw.text((200, 120), project['name'], fill='white', font=font, anchor='mm')
        draw.text((200, 150), "HTML • CSS • JavaScript", fill='white', font=font_small, anchor='mm')
        
        img.save(f'project{i}.jpg', 'JPEG', quality=90)

# Create images
create_profile_image()
create_project_images()
print("Images generated successfully!")
