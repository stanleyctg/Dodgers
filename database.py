import sqlite3


conn_quiz = sqlite3.connect('quiz.db')
c_quiz = conn_quiz.cursor()
c_quiz.execute('''
CREATE TABLE earth (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
c_quiz.execute('''
CREATE TABLE mars (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
c_quiz.execute('''               
CREATE TABLE jupiter (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
# Insert data into the Earth table
# Insert data into the Earth table with multiple answers
# Insert data into the Earth table
questions = [
    ("What is the shape of the Earth?", "Flat", "Square", "Spherical", "Triangle", "Spherical", "The Earth is spherical in shape. This is supported by numerous scientific observations including satellite imagery and the way ships disappear hull-first over the horizon."),
    ("What is the primary gas in the Earth's atmosphere?", "Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen", "Nitrogen", "The primary gas in Earth's atmosphere is nitrogen which makes up about 78% of the atmosphere. This gas is crucial for life but is inert and doesn't support combustion or respiration directly."),
    ("Which planet is known as the 'Blue Planet'?", "Mars", "Saturn", "Earth", "Neptune", "Earth", "Earth is known as the 'Blue Planet' due to its distinct blue appearance from space which is caused by the vast majority of its surface being covered by water."),
    ("The Earth orbits around what celestial body?", "Moon", "Mars", "Sun", "Jupiter", "Sun", "Earth orbits around the sun which is the center of our solar system. This orbit takes approximately one year to complete and is the basis for our calendar system."),
    ("What causes day and night on Earth?", "The Earth orbits the Sun", "The Earth spins on its axis", "The Moon blocks the Sun", "The Sun moves around the Earth", "The Earth spins on its axis", "The rotation of Earth on its axis causes day and night. This rotation occurs once every 24 hours and results in the periodic alternation of light (day) and darkness (night) in any given area of the world."),
    ("What is the Earth's largest ocean?", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean", "Pacific Ocean", "The largest ocean on Earth is the Pacific Ocean. It spans more than 63 million square miles making it larger than all of Earth's land area combined."),
    ("What percentage of the Earth's surface is covered by water?", "About 51%", "About 61%", "About 71%", "About 81%", "About 71%", "About 71% of Earth's surface is covered by water. This includes oceans seas lakes rivers and ice formations like glaciers and ice caps."),
    ("Earth is the third planet from the Sun. What is the fourth?", "Mars", "Venus", "Jupiter", "Mercury", "Mars", "Earth is the third planet from the Sun; Mars is the fourth. This positions Mars as our outer neighboring planet in the solar system."),
    ("What phenomenon causes the ocean tides on Earth?", "Wind", "Earth's rotation", "Gravitational pull of the Moon", "Gravitational pull of the Sun", "Gravitational pull of the Moon", "The gravitational pull of the Moon causes ocean tides on Earth. The Sun also plays a role but the Moon's closer proximity to Earth makes its gravitational impact more significant."),
    ("The Earth's magnetic field helps protect the planet from:", "Asteroids", "Solar winds", "Moon's gravitational pull", "Darkness at night", "Solar winds", "Earth's magnetic field protects the planet from solar winds. These are streams of charged particles emitted by the Sun which can cause significant disruptions to satellites and power grids on Earth."),
    ("Which of the following gases contributes most to the Earth's greenhouse effect?", "Oxygen", "Nitrogen", "Carbon dioxide", "Argon", "Carbon dioxide", "Carbon dioxide is the gas that contributes most to Earth's greenhouse effect. While essential for warming the Earth to habitable temperatures increased levels due to human activity are leading to climate change."),
    ("The layer of the Earth where tectonic plates are found is called the:", "Inner core", "Outer core", "Crust", "Mantle", "Mantle", "The layer of the Earth where tectonic plates are found is called the mantle. Specifically this involves the upper part of the mantle coupled with the crust forming the lithosphere."),
    ("The theory that explains the movement of the Earth's continents is called:", "Evolution", "Plate tectonics", "Gravity theory", "Relativity", "Plate tectonics", "The theory that explains the movement of Earth's continents is called plate tectonics. It describes how Earth's surface is divided into several large plates that slowly move over the underlying mantle."),
    ("What is the approximate age of the Earth?", "4.5 thousand years", "4.5 million years", "4.5 billion years", "4.5 trillion years", "4.5 billion years", "The approximate age of the Earth is 4.5 billion years. This estimation is based on dating of ancient rocks and meteorites."),
    ("The zone of Earth where life exists is known as the:", "Biosphere", "Atmosphere", "Stratosphere", "Hydrosphere", "Biosphere", "The zone of Earth where life exists is known as the biosphere. It includes all living organisms on Earth interacting with elements of the lithosphere atmosphere and hydrosphere."),
    ("The process by which plants convert sunlight into energy is called:", "Photosynthesis", "Respiration", "Fermentation", "Photovoltaics", "Photosynthesis", "The process by which plants convert sunlight into energy is called photosynthesis. This process transforms light energy into chemical energy which plants use to create sugars from carbon dioxide and water.")
]


data = [
    ("What color is commonly associated with Mars?", "Blue", "Green", "Red", "Yellow", "Red", "Mars is commonly known as the 'Red Planet' due to its reddish appearance which is caused by iron oxide or rust on its surface."),
    ("Mars is also known by which of the following names?", "The Evening Star", "The Red Planet", "The Blue Planet", "The Ringed Planet", "The Red Planet", "Mars is also referred to as 'The Red Planet.' This nickname is derived from its distinct red coloration which makes it easily identifiable in the night sky."),
    ("What is the main component of the Martian atmosphere?", "Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen", "Carbon dioxide", "The main component of the Martian atmosphere is carbon dioxide which comprises about 95% of its atmosphere. This creates a very thin atmosphere compared to Earth's with very low atmospheric pressure."),
    ("Which planet is closest in size to Mars?", "Mercury", "Venus", "Jupiter", "Saturn", "Mercury", "Mars is closest in size to Mercury. Although Mars and Mercury are different in many ways including their atmospheric and surface conditions their sizes are relatively similar."),
    ("Mars has how many moons?", "1", "2", "4", "6", "2", "Mars has two moons Phobos and Deimos. These small moons are thought to be captured asteroids and are irregular in shape."),
    ("What is the tallest volcano on Mars called?", "Olympus Mons", "Mount Everest", "Mauna Loa", "Fuji", "Olympus Mons", "The tallest volcano on Mars and indeed the tallest in the entire solar system is Olympus Mons. It is a shield volcano that stands about 22 kilometers high and spans approximately 600 kilometers in diameter."),
    ("Which of these is a huge canyon on Mars?", "Grand Canyon", "Mariana Trench", "Valles Marineris", "Great Rift Valley", "Valles Marineris", "Valles Marineris is a vast canyon system on Mars that is one of the largest canyons in the solar system. It stretches over 4000 kilometers in length and reaches depths of up to 7 kilometers."),
    ("Which of the following missions successfully landed a rover on Mars?", "Voyager 1", "Apollo 11", "Curiosity", "Pioneer 10", "Curiosity", "The Curiosity rover successfully landed on Mars as part of NASA's Mars Science Laboratory mission. It has been exploring the Martian surface since 2012 studying its geology and climate."),
    ("Mars' surface features include which of the following?", "Oceans", "Deserts", "Rivers", "Sand dunes", "Sand dunes", "Mars' surface features prominently include sand dunes. The planet's surface is mostly a barren rocky desert with extensive dunes in many areas shaped by the Martian wind."),
    ("The length of a day on Mars is:", "Slightly longer than a day on Earth", "Slightly shorter than a day on Earth", "Exactly the same as a day on Earth", "Twice as long as a day on Earth", "Slightly longer than a day on Earth", "The length of a day on Mars is slightly longer than a day on Earth known as a sol. A Martian sol is approximately 24 hours and 39 minutes."),
    ("Phobos and Deimos are:", "Asteroids near Mars", "Moons of Mars", "Mountains on Mars", "Space missions to Mars", "Moons of Mars", "Phobos and Deimos are the two moons of Mars. These small irregular-shaped bodies are believed to be captured asteroids and orbit Mars very closely."),
    ("Evidence suggests that Mars may have once had:", "Dense forests", "Large bodies of water", "Active volcanoes", "Extensive cave systems", "Large bodies of water", "Evidence suggests that Mars may have once had large bodies of water. This hypothesis is supported by geological features that appear to have been formed by flowing water such as dried-up river beds and lake basins."),
    ("Mars' gravity compared to Earth's is:", "About the same", "About half as strong", "Twice as strong", "Negligible", "About half as strong", "Mars' gravity is about half as strong as Earth's. This reduced gravity affects many aspects of the Martian environment from the way water would flow to the movements of dust storms."),
    ("In terms of exploration Mars is considered a likely candidate for:", "Mining operations", "Human colonization", "Agricultural development", "All of the above", "Human colonization", "Mars is considered a likely candidate for human colonization due to its relatively benign environment compared to other planets and its potential to support life with technological assistance."),
    ("The presence of what element in Martian rocks suggests that water may have been abundant in the past?", "Iron", "Silicon", "Hydrogen", "Gold", "Iron", "The presence of iron in Martian rocks suggests that water may have been abundant in the past. Iron oxidation requires water indicating that liquid water was once present on Mars' surface."),
    ("The seasonal changes on Mars are primarily due to its:", "Proximity to the Sun", "Elliptical orbit", "Tilted axis", "Moons", "Tilted axis", "The seasonal changes on Mars are primarily due to its tilted axis. Like Earth Mars has a tilt that causes seasonal variations though they are more extreme due to its more elliptical orbit."),
    ("Which rover found evidence of ancient water flows on Mars?", "Spirit", "Opportunity", "Curiosity", "Perseverance", "Curiosity", "The Curiosity rover found evidence of ancient water flows on Mars. It discovered geological formations that suggest water once flowed freely across the surface providing insights into the planet's climatic history."),
]


data_jupiter = [
    ("What is the largest planet in our solar system?", "Mars", "Venus", "Saturn", "Jupiter", "Jupiter", "Jupiter is the largest planet in our solar system known for its massive size and prominent gas giant status which makes it a significant astronomical object."),
    ("Jupiter is primarily made up of which two gases?", "Oxygen and hydrogen", "Hydrogen and helium", "Carbon dioxide and nitrogen", "Methane and ammonia", "Hydrogen and helium", "Jupiter is primarily made up of hydrogen and helium. These two gases comprise most of the planet's atmosphere making it similar in composition to a star but without sufficient mass for nuclear fusion."),
    ("How many moons does Jupiter have?", "4", "16", "Over 79", "2", "Over 79", "Jupiter has over 79 moons highlighting its strong gravitational influence which allows it to capture numerous celestial bodies into its orbit."),
    ("What is the most distinctive feature visible on Jupiter?", "Rings", "Great Red Spot", "Ice caps", "Green patches", "Great Red Spot", "The most distinctive feature visible on Jupiter is the Great Red Spot a gigantic storm larger than Earth that has been active for at least 400 years."),
    ("Jupiter's Great Red Spot is a:", "Mountain", "Ocean", "Storm", "Desert", "Storm", "Jupiter's Great Red Spot is a massive storm characterized by high-speed winds and a swirling vortex making it one of the most well-known features in the solar system."),
    ("Which of the following is NOT one of Jupiter's four largest moons also known as the Galilean moons?", "Europa", "Ganymede", "Callisto", "Titan", "Titan", "Among Jupiter's four largest moons known as the Galilean moons Titan is not one. The Galilean moons include Io Europa Ganymede and Callisto."),
    ("How long does it take for Jupiter to complete one orbit around the Sun?", "12 Earth years", "1 Earth year", "29 Earth years", "5 Earth years", "12 Earth years", "It takes Jupiter 12 Earth years to complete one orbit around the Sun. This long orbital period is reflective of its distance from the Sun and the extensive path it travels."),
    ("Jupiter emits more heat than it receives from the Sun due to:", "Nuclear fission", "Nuclear fusion", "Kelvin-Helmholtz mechanism", "Its many moons", "Kelvin-Helmholtz mechanism", "Jupiter emits more heat than it receives from the Sun due to the Kelvin-Helmholtz mechanism which involves the slow contraction of the planet's atmosphere releasing heat."),
    ("Which feature of Jupiter is primarily responsible for its strong magnetic field?", "Its rapid rotation", "Its rocky core", "Its many moons", "Its rings", "Its rapid rotation", "Jupiter's strong magnetic field is primarily caused by its rapid rotation which helps generate a powerful magnetic dynamo effect."),
    ("The rings of Jupiter are mostly composed of:", "Rock and ice", "Dust particles", "Gas clouds", "Liquid water", "Dust particles", "The rings of Jupiter are primarily composed of dust particles. These rings are faint and consist mostly of material ejected from its moons."),
    ("Jupiter's moon Ganymede is notable because it is:", "The smallest moon in the solar system", "Larger than the planet Mercury", "Covered entirely in water", "The hottest moon in the solar system", "Larger than the planet Mercury", "Jupiter's moon Ganymede is notable for being larger than the planet Mercury making it the largest moon in the solar system."),
    ("Which instrument first discovered the four largest moons of Jupiter?", "Hubble Space Telescope", "Galileo's telescope", "Voyager spacecraft", "Cassini spacecraft", "Galileo's telescope", "The four largest moons of Jupiter were first discovered by Galileo Galilei using his telescope marking a significant advancement in astronomy."),
    ("Jupiter's atmosphere has bands of different colors due to:", "Different types of rocks", "Variations in temperature and chemical composition", "Reflections from its moons", "Light from the Sun", "Variations in temperature and chemical composition", "Jupiter's atmosphere has bands of different colors due to variations in temperature and chemical composition which affect how light is scattered and absorbed."),
    ("The temperature in the clouds of Jupiter can reach as low as:", "-145 degrees Celsius", "0 degrees Celsius", "-10 degrees Celsius", "-50 degrees Celsius", "-145 degrees Celsius", "The temperature in the clouds of Jupiter can reach as low as -145 degrees Celsius reflecting the extreme conditions in the upper layers of the planet's atmosphere."),
    ("Which of Jupiter's moons is believed to have a subsurface ocean?", "Io", "Europa", "Ganymede", "Callisto", "Europa", "Europa one of Jupiter's moons is believed to have a subsurface ocean beneath its icy crust suggesting the potential for harboring life or providing insights into astrobiological processes."),
    ("The primary reason Jupiter has such a thick atmosphere is due to its:", "High temperatures", "Strong gravity", "Orbital speed", "Magnetic field", "Strong gravity", "The primary reason Jupiter has such a thick atmosphere is due to its strong gravity which retains a wide range of gases and contributes to its massive size and density."),
    ("Jupiter's position in the solar system is important because it:", "Protects inner planets from cometary impacts", "Supplies heat to nearby planets", "Produces light visible from Earth", "Has habitable conditions", "Protects inner planets from cometary impacts", "Jupiter's position in the solar system is important because it acts as a shield protecting inner planets from cometary impacts by gravitationally influencing or capturing potential impactors.")
]

# Use executemany to insert the data
c_quiz.executemany('INSERT INTO earth (question, answer1, answer2, answer3, answer4, correct_answer, facts) VALUES (?, ?, ?, ?, ?, ?, ?)', questions)
# Insert data into the Mars table
c_quiz.executemany('INSERT INTO mars (question, answer1, answer2, answer3, answer4, correct_answer, facts) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
# Insert data into the Jupiter table
c_quiz.executemany('INSERT INTO jupiter (question, answer1, answer2, answer3, answer4, correct_answer, facts) VALUES (?, ?, ?, ?, ?, ?, ?)', data_jupiter)

# Commit the changes and close the connection
conn_quiz.commit()
conn_quiz.close()


# Setup profile.db
conn_profile = sqlite3.connect('profile.db')
c_profile = conn_profile.cursor()
c_profile.execute('''
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fuel INTEGER DEFAULT 0,
    planet TEXT NOT NULL
)
''')
c_profile.execute('''
CREATE TABLE view (
    id INTEGER PRIMARY KEY,
    stored_info TEXT NOT NULL
)
''')
c_profile.execute('''
INSERT INTO accounts (username, password, fuel, planet)
VALUES ("stanley", "12345", 90, "Earth")
''')
conn_profile.commit()
conn_profile.close()