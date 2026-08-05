/* Queens puzzle styling */
.queensTable {
  border-collapse: collapse;
  margin-top: 0.75rem;
}

.queensTable td {
  width: 36px;
  height: 36px;
  border: 1px solid #555;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  font-size: 22px;
}

/* Region colors */
.queensCell-A { background-color: rgba(255, 0, 0, 0.18); }
.queensCell-B { background-color: rgba(0, 255, 0, 0.18); }
.queensCell-C { background-color: rgba(0, 0, 255, 0.18); }
.queensCell-D { background-color: rgba(255, 255, 0, 0.18); }
.queensCell-E { background-color: rgba(255, 0, 255, 0.18); }
.queensCell-F { background-color: rgba(0, 255, 255, 0.18); }
.queensCell-G { background-color: rgba(255, 255, 255, 0.08); }

/* State styles */
.queensCell-x {
  color: #ff5c5c;
  font-weight: bold;
}

.queensCell-queen {
  color: #ffd700;
  font-weight: bold;
}
