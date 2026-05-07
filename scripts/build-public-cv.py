from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


output_path = Path("public/files/david-addis-cv.pdf")
output_path.parent.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="Name",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#18211f"),
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Intro",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#33413d"),
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#733324"),
        spaceBefore=9,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Role",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#18211f"),
        spaceBefore=5,
        spaceAfter=1,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.2,
        leading=12,
        textColor=colors.HexColor("#33413d"),
        spaceAfter=3,
    )
)


def paragraph(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(text, styles[style])


story = [
    paragraph("David Addis", "Name"),
    paragraph(
        "Senior C# and C++ developer with experience on console, mobile and AR/VR.<br/>"
        "Location: London &nbsp;&nbsp; Email: dtaddis [at] gmail [dot] com",
        "Intro",
    ),
    paragraph("Skills", "Section"),
    paragraph(
        "C#, C++, Java, Python, Lua &bull; Unity, Unreal Engine, Maya, Blender, Adobe Suite &bull; "
        "iOS, Android, AR, VR, Xbox 360, PS3, PC, PSP and NDS development &bull; "
        "English, basic Swedish and Ukrainian"
    ),
    paragraph("Experience", "Section"),
    paragraph("Principal Programmer at FundamentalVR &nbsp;&nbsp; May 2023 - Present", "Role"),
    paragraph(
        "Lead engineer on a team creating VR simulations of surgical procedures for Meta Quest "
        "and desktop headsets using Unity and OpenXR. Responsibilities included liaison with design "
        "and medical teams, scheduling, product demos, and resolving major bugs and performance issues."
    ),
    paragraph("Lead Programmer at Factory42 &nbsp;&nbsp; September 2019 - April 2023", "Role"),
    paragraph(
        "Managed a team of five programmers and shipped AR titles on iPhone, Android and Magic Leap, "
        "as well as VR prototypes on Meta Quest. Worked mainly in Unity, with Android Studio and other "
        "tools where appropriate. Liaised with production to keep projects on schedule and integrated "
        "location-based experiences on site."
    ),
    paragraph("Lead Programmer at NaturalMotion &nbsp;&nbsp; January 2013 - September 2019", "Role"),
    paragraph(
        "Developer on the strategy game <i>Dawn of Titans</i>, working across believable troop movement "
        "for thousands of real-time soldiers, shaders, network code, Scaleform UI, tools, and an "
        "unreleased VR mode in an in-house C++ engine."
    ),
    paragraph("Senior Programmer at Lionhead Studios &nbsp;&nbsp; July 2008 - October 2012", "Role"),
    paragraph(
        "Helped ship <i>Fable 2</i>, <i>Fable 3</i>, and the Kinect title <i>Fable: The Journey</i> "
        "using Unreal Engine 3. During the prototype project <i>Milo</i>, wrote several Kinect "
        "minigames in C++ and Lua."
    ),
    paragraph("Gameplay/UI Programmer at Electronic Arts &nbsp;&nbsp; June 2005 - July 2008", "Role"),
    paragraph("Wrote and maintained features for <i>Black</i> and several <i>Burnout</i> games."),
    paragraph("Gameplay Programmer at Codemasters &nbsp;&nbsp; April 2004 - June 2005", "Role"),
    paragraph("Worked as a gameplay programmer on commercial game projects."),
    paragraph("Education", "Section"),
    paragraph("Physics with Computing, BSc from The University of Warwick."),
    paragraph("Other Interests", "Section"),
    paragraph(
        "Runs a YouTube channel about games and technology, and develops games for fun, available on "
        "Steam and the Meta Quest store."
    ),
    Spacer(1, 4 * mm),
    paragraph(
        "Public web version. Date of birth, mobile number and direct email address have been removed.",
        "Body",
    ),
]

doc = SimpleDocTemplate(
    str(output_path),
    pagesize=A4,
    leftMargin=16 * mm,
    rightMargin=16 * mm,
    topMargin=14 * mm,
    bottomMargin=14 * mm,
    title="David Addis CV",
    author="David Addis",
)
doc.build(story)
