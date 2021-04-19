class Vec3
{
  constructor(x,y,z)
  {
      this.x = x;
      this.y = y;
      this.z = z;
  }

// Add method
  add(v)
  {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

// Sum method
  sum()
  {
    return this.x + this.y + this.z;
  }

// Min
  min() {
    var min = this.x;
    if(min > this.y){
      min = this.y;
    }
    if (min > this.z) {
      min = this.z;
    }
    return min;
  } 

// Mid
  mid(){
    if (this.x >= this.y) {
      if (this.y >= this.z) {
        return this.y;
      }
      else if (this.x <= this.z) {
        return this.x;
      }
      else {
        return this.z;
      }
    }
    else if (this.x < this.z) {
      if (this.y > this.z) {
        return this.z;
      }
      else {
        return this.y;
      }
    }
    else {
      return this.x;
    }
  }

//Max
  max(){
    var max = this.x;
    if (max < this.y) {
      max = this.y;
    }
    if (max < this.z) {
      max = this.z;
    }
    return max;
  }

}
