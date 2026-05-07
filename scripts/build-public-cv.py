from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


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
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#33413d"),
        spaceAfter=0,
    )
)
styles.add(
    ParagraphStyle(
        name="Meta",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        alignment=TA_RIGHT,
        textColor=colors.HexColor("#66706b"),
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
        spaceBefore=8,
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
        spaceBefore=4,
        spaceAfter=1,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=11.5,
        textColor=colors.HexColor("#33413d"),
        spaceAfter=2,
    )
)
styles.add(
    ParagraphStyle(
        name="CvBullet",
        parent=styles["Body"],
        leftIndent=9,
        firstLineIndent=-9,
    )
)


def paragraph(text: str, style: str = "Body") -> Paragraph:
    return Paragraph(text, styles[style])


def bullet(text: str) -> Paragraph:
    return paragraph(f"&bull;&nbsp; {text}", "CvBullet")


def role(title: str, text: str):
    return KeepTogether([paragraph(title, "Role"), paragraph(text)])


story = []

story.append(
    Table(
        [
            [
                paragraph("David Addis", "Name"),
                paragraph("London<br/>dtaddis [at] gmail [dot] com", "Meta"),
            ]
        ],
        colWidths=[112 * mm, 51 * mm],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        ),
    )
)
story.extend(
    [
        HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#d8d0c5"), spaceAfter=6),
        paragraph(
        "Senior C# and C++ developer with experience on console, mobile and AR/VR.<br/>"
        "Commercial experience across Unity, Unreal Engine, proprietary engines, mobile, console, VR and AR.",
        "Intro",
        ),
        paragraph("Skills", "Section"),
        bullet("C#, C++, Java, Python, Lua"),
        bullet("Unity, Unreal Engine, Maya, Blender, Adobe Suite"),
        bullet("iOS, Android, AR, VR, Xbox 360, PS3, PC, PSP and NDS development"),
        bullet("English, basic Swedish and Ukrainian"),
        paragraph("Experience", "Section"),
    ]
)
story.extend(
    [
        role(
            "Principal Programmer at FundamentalVR &nbsp;&nbsp; May 2023 - Present",
            "Lead engineer on a team creating VR simulations of surgical procedures for Meta Quest "
            "and desktop headsets using Unity and OpenXR. Responsibilities included liaison with design "
            "and medical teams, scheduling, product demos, and resolving major bugs and performance issues.",
        ),
        role(
            "Lead Programmer at Factory42 &nbsp;&nbsp; September 2019 - April 2023",
        "Managed a team of five programmers and shipped AR titles on iPhone, Android and Magic Leap, "
        "as well as VR prototypes on Meta Quest. Worked mainly in Unity, with Android Studio and other "
        "tools where appropriate. Liaised with production to keep projects on schedule and integrated "
            "location-based experiences on site.",
        ),
        role(
            "Lead Programmer at NaturalMotion &nbsp;&nbsp; January 2013 - September 2019",
        "Developer on the strategy game <i>Dawn of Titans</i>, working across believable troop movement "
        "for thousands of real-time soldiers, shaders, network code, Scaleform UI, tools, and an "
            "unreleased VR mode in an in-house C++ engine.",
        ),
        role(
            "Senior Programmer at Lionhead Studios &nbsp;&nbsp; July 2008 - October 2012",
        "Helped ship <i>Fable 2</i>, <i>Fable 3</i>, and the Kinect title <i>Fable: The Journey</i> "
        "using Unreal Engine 3. During the prototype project <i>Milo</i>, wrote several Kinect "
            "minigames in C++ and Lua.",
        ),
        role(
            "Gameplay/UI Programmer at Electronic Arts &nbsp;&nbsp; June 2005 - July 2008",
            "Wrote and maintained features for <i>Black</i> and several <i>Burnout</i> games.",
        ),
        role(
            "Gameplay Programmer at Codemasters &nbsp;&nbsp; April 2004 - June 2005",
            "Worked as a gameplay programmer on commercial game projects.",
        ),
        paragraph("Education", "Section"),
        paragraph("Physics with Computing, BSc from The University of Warwick."),
        paragraph("Other Interests", "Section"),
        paragraph(
        "Runs a YouTube channel about games and technology, and develops games for fun, available on "
        "Steam and the Meta Quest store."
        ),
    ]
)

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
