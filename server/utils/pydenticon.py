import pydenticon

def hex_to_rgbstring(hex):
    hex = hex[1:]
    r = int(hex[0:2], 16)
    g = int(hex[2:4], 16)
    b = int(hex[4:6], 16)

    return f"rgb({r},{g},{b})"

def create_company_logo(title, primary_color, secondary_color):
    foreground = [hex_to_rgbstring(primary_color)]
    background = "rgba(255, 255, 255, 0)"

    padding = (20, 20, 20, 20)

    generator = pydenticon.Generator(5, 5,
                                     foreground=foreground, background=background)

    return generator.generate(title, 200, 200, output_format="png", padding=padding)
